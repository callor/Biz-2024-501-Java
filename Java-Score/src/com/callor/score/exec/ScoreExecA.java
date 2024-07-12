package com.callor.score.exec;

import java.io.FileNotFoundException;

import com.callor.score.service.ScoreService;
import com.callor.score.service.impl.ScoreServiceImplV1;

public class ScoreExecA {
	public static void main(String[] args) {
		
		ScoreService scoreService = null;
		String scoreDataFile = "src/com/callor/score/score.txt";
		try {
			scoreService = new ScoreServiceImplV1(scoreDataFile);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		scoreService.loadScoreData();
		scoreService.printScoreList();
	}
}
