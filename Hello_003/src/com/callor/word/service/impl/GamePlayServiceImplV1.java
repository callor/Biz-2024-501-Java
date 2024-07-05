package com.callor.word.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

import com.callor.word.models.WordVO;
import com.callor.word.service.GamePlayService;
import com.callor.word.service.WordService;
import com.callor.word.utils.Line;

public class GamePlayServiceImplV1 implements GamePlayService{
	
	protected final WordService wordService;
	protected final Scanner keyInput;
	protected WordVO word = null;
	
	public GamePlayServiceImplV1(WordService wordService) {
		super();
		this.wordService = wordService;
		this.keyInput = new Scanner(System.in);
	}

	@Override
	public void gameStart() {
		while(true) {
			System.out.println(Line.dLine(100));
			System.out.println("World Word Game Festival!!!");
			System.out.println(Line.dLine(100));
			System.out.println();
			
			this.getWord();
			this.inputWord();
			
			System.out.println("게임을 계속하시겠습니까");
			System.out.print("Y/n >> ");
			String yesNo = keyInput.nextLine();
			if(yesNo.equalsIgnoreCase("n")) {
				System.out.println("GAME OVER!!!");
			}
		}
	}

	@Override
	public void getWord() {
		word = wordService.getWord();
	}

	@Override
	public void inputWord() {
		int gameCount = 0;
		while(true) {
			System.out.println("다음에 제시된 번역과 일치하는 영어 단어를 입력하세요");
			
			System.out.println(Line.sLine(100));
			System.out.println(word.korean);
			System.out.println(Line.sLine(100));
			System.out.printf("종료(--QUIT) >>");
			String inputStr = keyInput.nextLine();
			
			if(inputStr.equals("힌트")) this.getHint();
			
			if(inputStr.equals("--QUIT")) break;
			if(inputStr.isBlank()) {
				System.out.println("단어를 입력해 주세요");
				continue;
			}
			if(inputStr.trim().equalsIgnoreCase(word.english)) {
				System.out.println("참 잘했어요");
				break;
			} else {
				System.out.println("다시한번 생각해 보세요");
				System.out.println("힌트를 보려면 힌트 라고 입력하세요");
			}
			if( ++gameCount > 5 ) {
				System.out.println("5번의 기회를 모두 놓쳤네요");
				System.out.printf("영단어 : %s, 번역 : %s\n",word.english, word.korean);
				break;
			}
		}
	}

	@Override
	public void score() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void getHint() {

		// 영어 단어를 알파벳 단위로 분해하기
		String[] words = word.english.split("");
		
		// 문자열 배열을 List<String> type 으로 변환하기
		List<String> hintStr = new ArrayList<>(Arrays.asList(words));
		
		// 리스트의 순서를 무작위로 섞기
		Collections.shuffle(hintStr);
		
		System.out.println(Line.dLine(100));
		System.out.println(hintStr);
		System.out.println(Line.dLine(100));
		
	}

}
