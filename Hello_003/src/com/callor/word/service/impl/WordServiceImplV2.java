package com.callor.word.service.impl;

import java.io.FileNotFoundException;

import com.callor.word.models.WordVO;

public class WordServiceImplV2 extends WordServiceImplV1 {

	public WordServiceImplV2(String wordFile) throws FileNotFoundException {
		/*
		 * WordServiceImplV1 클래스를 상속받아 ...V2 클래스를 선언했다
		 * 그런데 V1 클래스의 생성자에는 wordFile, wordList, fileScan 등을
		 * 초기화 시키는 코드가 있다
		 * 원칙은 V2 에서도 그러한 코드를 모두 구현해야 한다
		 * 하지만 코드가 중복되는 문제가 발생할 수 있다
		 * 그래서 V2 에서 코드를 구현하지 않고
		 * V1 의 생성자코드를 실행하도록 한다
		 * 그러한 코드가 super(...) 이다
		 */
		super(wordFile);
	}

	/*
	 * wordList 중에서 임의의 단어 한개를 get 하여
	 * return 하기
	 */
	@Override
	public WordVO getWord() {
		
		int listSize = wordList.size();

//		if(listSize < 1) {
//			this.wordFileRead();
//			listSize = wordList.size();
//		}
		
		int position = (int)(Math.random() * listSize);
		return wordList.get(position);
		
	}
	
	
	
	

}
