package com.callor.word.exec;

import java.io.FileNotFoundException;

import com.callor.word.service.GamePlayService;
import com.callor.word.service.WordService;
import com.callor.word.service.impl.GamePlayServiceImplV1;
import com.callor.word.service.impl.WordServiceImplV2;

public class WordExecD {
	
	public static void main(String[] args) {
		
		WordService wordService = null;
		try {
			wordService = new WordServiceImplV2("src/com/callor/word/word.txt");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		GamePlayService playService = new GamePlayServiceImplV1(wordService);
		playService.gameStart();

	}

}
