package com.callor.word.exec;

import java.io.FileNotFoundException;

import com.callor.word.service.WordService;
import com.callor.word.service.impl.WordServiceImplV2;

public class WordExecA {
	public static void main(String[] args) {
		
		String wordFile = "src/com/callor/word/word.txt";
		WordService wordService = null;
		try {
			wordService = new WordServiceImplV2(wordFile);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("파일을 읽지 못한다네");
		}
//		wordService.wordFileRead();
		wordService.wordListPrint();
		
	}

}
