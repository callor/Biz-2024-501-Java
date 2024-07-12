package com.callor.score.service.impl;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.callor.score.models.ScoreDto;
import com.callor.score.service.ScoreService;
import com.callor.score.utils.Contract;
import com.callor.score.utils.Line;

/*
 * 생성자를 통해서 score.txt 파일의 경로 주입받기
 * Scanner 를 사용하여 파일을 읽을 수 있도록 준비
 * 클래스 영역에 List<ScoreDto> scoreList 객체 선언하기
 * 생성자에서 scoreList 객체 초기화 하기
 * loadScoreData() 에서 파일을 읽어 scoreList 객체에 추가하기
 */
public class ScoreServiceImplV1 implements ScoreService {
	
	protected final String scoreDataFile;
	
	protected String[] scoreTitle;
	protected final List<ScoreDto> scoreList;
	protected final Scanner fileReader;
	public ScoreServiceImplV1(String scoreDataFile) throws FileNotFoundException {
		this.scoreDataFile = scoreDataFile;
		this.scoreList = new ArrayList<>();
		InputStream in = new FileInputStream(this.scoreDataFile);
		this.fileReader = new Scanner(in);
	}

	@Override
	public void loadScoreData() {
		scoreTitle = fileReader.nextLine().split(",");
		while(fileReader.hasNext()) {
			String line = fileReader.nextLine();
			String[] lines = line.split(",");
			ScoreDto dto = new ScoreDto();
			dto.sc_num = lines[ Contract.SCORE.학번 ];
			dto.sc_kor = Integer.valueOf(lines[ Contract.SCORE.국어 ]);
			dto.sc_eng = Integer.valueOf(lines[ Contract.SCORE.영어 ]);
			dto.sc_math = Integer.valueOf(lines[ Contract.SCORE.수학 ]);
			dto.sc_art = Integer.valueOf(lines[ Contract.SCORE.미술 ]);
			dto.sc_music = Integer.valueOf(lines[ Contract.SCORE.음악]);
			dto.sc_db = Integer.valueOf(lines[ Contract.SCORE.데이터베이스 ]);
			dto.sc_sw = Integer.valueOf(lines[ Contract.SCORE.소프트웨어공학 ]);
			scoreList.add(dto);
		}
	}
	
	/*
	 * 다음과 같이 scoreList 에 저장된 성적을 출력하시오
	 * ===========================================
	 * 성적표
	 * -------------------------------------------
	 * 학번	국어  영어  수학 ....       총점  평균
	 * -------------------------------------------
	 * 
	 * --------------------------------------------
	 *       90    89    90                     90
	 * ============================================
	 */
	@Override
	public void printScoreList() {
		
		int[] subjectTotal = new int[scoreTitle.length];
		
		System.out.println(Line.dLine(100));
		System.out.println("성적표");
		System.out.println(Line.sLine(100));
		for(String title : scoreTitle) {
			System.out.print(title + "\t");
		}
		System.out.println("총점\t평균\n" + Line.sLine(100));
		for(ScoreDto dto : scoreList) {
			System.out.printf("%5s\t",dto.sc_num);
			System.out.printf("%4d\t",dto.sc_kor);
			System.out.printf("%4d\t",dto.sc_eng);
			System.out.printf("%4d\t",dto.sc_math);
			System.out.printf("%4d\t",dto.sc_music);
			System.out.printf("%4d\t",dto.sc_art);
			System.out.printf("%4d\t",dto.sc_sw);
			System.out.printf("%4d\t",dto.sc_db);
			System.out.printf("%5d\t",dto.total());
			System.out.printf("%.2f\n",dto.average());
			
			subjectTotal[Contract.SCORE.국어] +=  dto.sc_kor;
			subjectTotal[Contract.SCORE.영어] +=  dto.sc_eng;
			subjectTotal[Contract.SCORE.수학] +=  dto.sc_math;
			subjectTotal[Contract.SCORE.음악] +=  dto.sc_music;
			subjectTotal[Contract.SCORE.미술] +=  dto.sc_art;
			subjectTotal[Contract.SCORE.소프트웨어공학] +=  dto.sc_sw;
			subjectTotal[Contract.SCORE.데이터베이스] +=  dto.sc_db;
			
		}
		System.out.println(Line.sLine(100));
		System.out.print("\t");
		float avgTotal = 0;
		for(int i = 1 ; i < subjectTotal.length ; i++) {
			float subjectAvg = (float)subjectTotal[i] /scoreList.size();
			System.out.printf("%.2f\t",subjectAvg);
			avgTotal += subjectAvg ;
		}
		System.out.printf("\t\t%.2f",avgTotal / (subjectTotal.length - 1));
		System.out.println("\n" +Line.dLine(100));
	}
}
