package com.callor.word.exec;

import java.util.Scanner;

/*
 * 키보드를 통하여 학생이름, 국어, 영어, 수학 성적을
 * 차례로 입력받고
 * 
 * ====================================
 * 학생이름 : 000
 * 국어 : 000
 * 영어 : 000
 * 수학 : 000
 * -------------------------------------
 * 총점 : 000
 * 평균 : 000
 * ======================================
 */
public class ScannerC {

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		String name = null;
		// 헝가리언 표기법
		// 변수명 시작을 변수의 type 명칭으로 시작하는 표기법
		int intKor = 0;
		int intEng = 0;
		int intMath = 0;
		int intSum = 0;
		float floatAvg = 0;
		
		System.out.println("학생의 이름을 입력하세요");
		System.out.print(">> ");
		name = scan.nextLine();
				
		System.out.println("과목 점수를 입력하세요");
		while(true) {
			System.out.print("국어>> ");
			String strKor = scan.nextLine();
			try {
				intKor = Integer.parseInt(strKor);
				if(intKor < 0 || intKor > 100) {
					System.out.println("점수는 0 부터 100점까지만 입력하세요");
					continue;
				}
			} catch (Exception e) {
				System.out.println("국어 점수는 숫자로만 입력하세요");
				continue;
			}
			break;
		}
		while(true) {
			System.out.print("영어>> ");
			String strEng = scan.nextLine();
			try {
				intEng = Integer.parseInt(strEng);
				if(intEng < 0 || intEng> 100) {
					System.out.println("점수는 0 부터 100점까지만 입력하세요");
					continue;
				}
			} catch (Exception e) {
				System.out.println("영어 점수는 숫자로만 입력하세요");
				continue;
			}
			break;
		}
		while(true) {
			System.out.print("수학>> ");
			String strMath = scan.nextLine();
			try {
				intMath = Integer.parseInt(strMath);
				if(intMath < 0 || intMath> 100) {
					System.out.println("점수는 0 부터 100점까지만 입력하세요");
					continue;
				}
			} catch (Exception e) {
				System.out.println("수학 점수는 숫자로만 입력하세요");
				continue;
			}
			break;
		}
		System.out.println("=".repeat(30));
		System.out.printf("학생이름 : %s\n",name);
		System.out.printf("국어 : %d\n",intKor);
		System.out.printf("영어 : %d\n",intEng);
		System.out.printf("수학 : %d\n",intMath);
		System.out.println("-".repeat(30));
		
		intSum = intKor;
		intSum += intEng;
		intSum += intMath;
		floatAvg = (float)intSum / 3;
		
		System.out.printf("총점 : %d\n",intSum);
		System.out.printf("평균 : %.2f\n",floatAvg);
		System.out.println("=".repeat(30));
	}
}
