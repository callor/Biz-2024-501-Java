import { KpwMonPay } from '@entities/sg100loc/pay/kpw-mon-pay.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { KakaoTalkBiz } from '@modules/kakaotalk/kakaotalk.biz';
import {Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {SG100LOC , PLANNER} from '@utils/constants';
import {EntityManager, Repository} from 'typeorm';
import { KpwMonPayDTO , KpwLaborContDTO, KpwContDTO } from '@modules/kakaotalk/dto/kakaotalk-kp.dto';
import { KpwLaborCont } from '@entities/sg100loc/laborCont/kpw-labor-cont.entity';
import { KpwCont } from '@entities/sg100loc/cont/kpw-cont.entity';
import { PrDemouser } from '@entities/planner/pr-demouser.entity';


@Injectable()
export class KpwPayslipBiz {
    constructor(
        private readonly logger: LoggerService,
        private readonly kakaoTalkBiz : KakaoTalkBiz,
        @InjectRepository(KpwMonPay, SG100LOC) private readonly kpwMonPay: Repository<KpwMonPay>,
        @InjectRepository(KpwLaborCont, SG100LOC) private readonly kpwLaborCont: Repository<KpwLaborCont>,
        @InjectRepository(KpwCont, SG100LOC) private readonly kpwCont: Repository<KpwCont>,
        @InjectRepository(PrDemouser, PLANNER) private readonly prDemouser: Repository<PrDemouser>,
        @InjectEntityManager(SG100LOC) private readonly manager: EntityManager,
    ) {
    }
    async updatePay() {
        const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('KPW2');
      // 전송 결과
      const resultPoll = await this.kakaoTalkBiz.getResultKp(tokenInfo.token);
      console.log(resultPoll);
      await Promise.all(
          resultPoll.response?.map(async (response) => {
            console.log(response);
            if(response.msgIdx.startsWith('payslip')){
              const kpwMonPayDTO = new KpwMonPayDTO; 
              kpwMonPayDTO.payno = response.msgIdx.replace(/[^0-9]/g, '');
              console.log(kpwMonPayDTO.payno);
              kpwMonPayDTO.kakaoSendYn = response.resultCode == 1000 && response.sendType == 'K' ? 1 : 0;
              kpwMonPayDTO.mmsSendYn = response.resultCode == 1000 && response.sendType == 'M' ? 1 : 0;
              kpwMonPayDTO.sendType = response.sendType;
              kpwMonPayDTO.resultCode = response.resultCode;
              kpwMonPayDTO.failSendYn = 0;
              kpwMonPayDTO.sendStatus = 2;
              if (kpwMonPayDTO.kakaoSendYn === 0 && kpwMonPayDTO.mmsSendYn === 0) {
                  kpwMonPayDTO.failSendYn = 1;
                  kpwMonPayDTO.sendStatus = 3;
              }
              await this.updateSendYn(kpwMonPayDTO);
            }else if(response.msgIdx.startsWith('lcont')){
              const kpwLaborContDTO = new KpwLaborContDTO;
              kpwLaborContDTO.laborContId = response.msgIdx.replace(/[^0-9]/g, '');
              kpwLaborContDTO.resultCode = response.resultCode;
              kpwLaborContDTO.sendType = response.sendType;
              await this.updateLaborContCode(kpwLaborContDTO);
            }else if(response.msgIdx.startsWith('pCont')){
              const kpwContDTO = new KpwContDTO;
              kpwContDTO.contId = response.msgIdx.replace(/[^0-9]/g, '');
              kpwContDTO.resultCode = response.resultCode;
              kpwContDTO.sendType = response.sendType;
              await this.updateContCode(kpwContDTO);
            }else if(response.msgIdx.startsWith('dCont')){
              const kpwContDTO = new KpwContDTO;
              kpwContDTO.contId = response.msgIdx.replace(/[^0-9]/g, '');
              kpwContDTO.resultCode = response.resultCode;
              kpwContDTO.sendType = response.sendType;
              await this.updateDesContCode(kpwContDTO);
              //pCont
            }else if (response.msgIdx.startsWith('demo')){
              const msgIdx = Number(response.msgIdx.replace(/[^0-9]/g, ''));
              await this.prDemouser.update(msgIdx, {
                smsRstCd : response.resultCode,
                smsType : response.sendType,
                smsSendDt : new Date(response.requestAt).getTime(),
              })
            }
        }
      ));
    };
    async updateSendYn(KpwMonPayDTO: KpwMonPayDTO) {
        await this.kpwMonPay.update(KpwMonPayDTO.payno, {
          kakaoSendYn: KpwMonPayDTO.kakaoSendYn,
          mmsSendYn: KpwMonPayDTO.mmsSendYn,
          failSendYn: KpwMonPayDTO.failSendYn,
          sendType: KpwMonPayDTO.sendType,
          resultCode: KpwMonPayDTO.resultCode,
          sendStatus:KpwMonPayDTO.sendStatus,
          sendingYn: 0 ,
        });
      }
    async updateLaborContCode(KpwLaborContDTO: KpwLaborContDTO) {
      await this.kpwLaborCont.update(KpwLaborContDTO.laborContId, {
        sendType: KpwLaborContDTO.sendType,
        resultCode: KpwLaborContDTO.resultCode,
      });
    }

    async updateContCode(KpwContDTO: KpwContDTO) {
      await this.kpwCont.update(KpwContDTO.contId, {
        sendType: KpwContDTO.sendType,
        resultCode: KpwContDTO.resultCode,
      });
    }

    async updateDesContCode(KpwContDTO: KpwContDTO) {
      await this.kpwCont.update(KpwContDTO.contId, {
        desSendType: KpwContDTO.sendType,
        desResultCode: KpwContDTO.resultCode,
      });
    }
}