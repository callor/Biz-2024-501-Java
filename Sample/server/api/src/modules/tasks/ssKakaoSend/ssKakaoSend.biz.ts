import {Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import LoggerService from '@modules/common/logger/logger.service';
import { KakaoTalkBiz } from '@modules/kakaotalk/kakaotalk.biz';
import { SSDB , KAFKA, SG100 } from '@utils/constants'; 
import { SsKakaoSend } from '@entities/ssdb/ss-kakao-send.entity';
import { GojiIssueInfo } from '@entities/kafka/goji-issue-info.entity';
import {EntityManager, Repository} from 'typeorm';
import { BizGojitt } from '@entities/kafka/biz-gojitt.entity';


@Injectable()
export class SsKakaoSendBiz{

    constructor(
        private readonly logger: LoggerService,
        private readonly kakaoTalkBiz : KakaoTalkBiz,
        @InjectRepository(SsKakaoSend, SSDB) private readonly ssKakaoSend: Repository<SsKakaoSend>,
        @InjectRepository(GojiIssueInfo, KAFKA) private readonly gojiIssueInfo: Repository<GojiIssueInfo>,
        @InjectRepository(BizGojitt, KAFKA) private readonly bizGojitt: Repository<BizGojitt>,
        @InjectEntityManager(SG100) private readonly manager: EntityManager,
    ) {
    }
    async updateKakaoSend() {
        const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('KP2');
      // 전송 결과
      const resultPoll = await this.kakaoTalkBiz.getResultKp(tokenInfo.token);
      console.log(resultPoll);
      await Promise.all(
          resultPoll.response?.map(async (response) => {
            const responseIdx = response.msgIdx;
            if (responseIdx.startsWith("ssback")){
              const msgIdx = Number(responseIdx.replace(/[^0-9]/g, ''));
              await this.ssKakaoSend.update(msgIdx, {
                  receive_code: response.resultCode,
                  receive_dt: response.receivedAt,
                  send_dt: response.requestAt
                });
            }else if(responseIdx.startsWith("kafka")){
              const msgIdx = Number(responseIdx.replace(/[^0-9]/g, ''));
              await this.gojiIssueInfo.update(msgIdx, {
                  result_code: response.resultCode,
                  receive_dt: response.receivedAt.replace(/[^0-9]/g, ''),
                  send_dt: response.requestAt.replace(/[^0-9]/g, ''),
                  send_type : response.sendType,
                });
              if(response.resultCode === '1000' ) {
                this.updateLaborgojiInfo(msgIdx)
              } 
            }else if(responseIdx.startsWith("encKaA")){
              const msgIdx = Number(responseIdx.replace(/[^0-9]/g, ''));
              await this.gojiIssueInfo.update(msgIdx, {
                  enc_result_code: response.resultCode,
                  enc_receive_dt: response.receivedAt.replace(/[^0-9]/g, ''),
                  enc_send_dt: response.requestAt.replace(/[^0-9]/g, ''),
                  enc_send_type : response.sendType,
                });
              if(response.resultCode === '1000' ) {
                this.updateLaborgojiInfo(msgIdx)
              } 
            }else if(responseIdx.startsWith("encKaB")){
              const msgIdx = Number(responseIdx.replace(/[^0-9]/g, ''));
              await this.gojiIssueInfo.update(msgIdx, {
                  enc_result_code2: response.resultCode,
                  enc_receive_dt2: response.receivedAt.replace(/[^0-9]/g, ''),
                  enc_send_dt2: response.requestAt.replace(/[^0-9]/g, ''),
                  enc_send_type2 : response.sendType,
                });
              if(response.resultCode === '1000' ) {
                this.updateLaborgojiInfo(msgIdx)
              } 
            }else if(responseIdx.startsWith("goji")){
              const seq_no = Number(responseIdx.replace(/[^0-9]/g, ''));
              await this.bizGojitt.update(seq_no,{
                send_result_code: response.resultCode,
                receive_dt: response.receivedAt.replace(/[^0-9]/g, ''),
                send_dt: response.requestAt.replace(/[^0-9]/g, ''),
                send_type : response.sendType,
              })      
            }
        }
      ));
    };


    async updateBizseeSend() {
      const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('BIZSEE');
    // 전송 결과
    const resultPoll = await this.kakaoTalkBiz.getResultKp(tokenInfo.token);
    console.log(resultPoll);
    await Promise.all(
        resultPoll.response?.map(async (response) => {
          const responseIdx = response.msgIdx;
            if(responseIdx.startsWith("goji")){
            const seq_no = Number(responseIdx.replace(/[^0-9]/g, ''));
            await this.bizGojitt.update(seq_no,{
              send_result_code: response.resultCode,
              receive_dt: response.receivedAt.replace(/[^0-9]/g, ''),
              send_dt: response.requestAt.replace(/[^0-9]/g, ''),
              send_type : response.sendType,
            })      
          }
      }
    ));
  };

    async updateLaborgojiInfo(msgIdx :number){
      const gojiDTO = await this.gojiIssueInfo
        .createQueryBuilder()
        .select('COID', 'coid')
        .addSelect('WORK_DATE', 'basicyyyymm')
        .where({msg_idx:msgIdx})
        .getRawOne();
      
        await this.manager
        .createQueryBuilder()
        .update("SG_LABORGOJI_INFO")
        .set({
          SMSSND:1,
          SMSSNDLASTDT: new Date()
        }).where("COID = :coid",{coid:gojiDTO.coid,})     
        .andWhere("BASICYYYYMM = :basicyyyymm",{basicyyyymm :gojiDTO.basicyyyymm})
        .execute();
    }
}