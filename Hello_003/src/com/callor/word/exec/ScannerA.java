package com.callor.word.exec;

import java.util.Scanner;

public class ScannerA {
	
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		
		System.out.println("키보드로 영어단어를 입력해 주세요");
		System.out.print(">> ");
		String input = scan.nextLine();
		System.out.println("입력받은 문자열 : " + input);
		
		
	}

}
