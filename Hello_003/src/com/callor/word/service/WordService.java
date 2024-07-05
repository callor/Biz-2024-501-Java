package com.callor.word.service;

import com.callor.word.models.WordVO;

/*
 * word.txt 파일을 읽어서 각 단어를 : 을 기준으로 분해하여
 * WordVO 클래스에 각각 담고, List<WordVO> 에 보관하기
 * 
 * List<WordVO> 에 보관된 리스트를 Console 에 출력하기
 */
public interface WordService {
	
	public void wordFileRead() ;
	public void wordListPrint();
	
	// wordList 에서 단어 한개를 추출하여 return
	public WordVO getWord();
	
	

}
