package com.callor.hello;

/*
 * main() method 를 만들고
 * 정수 1 ~ 10까지 숫자를 Console 에 출력하기
 */
public class HelloG {
	public static void main(String[] args) {
		for(int i = 1 ; i <= 10 ; i++) {
			System.out.println(i);
		}
		for(int i = 0 ; i < 10 ; i++) {
			System.out.println(i + 1);
		}
		System.out.println("=".repeat(30));
		/*
		 * 1 ~ 10까지 정수를
		 * 1, 2, 3, ... 10 형식으로 가로방향으로 출력하기
		 */
		for(int i = 0 ;  i < 10 ; i++) {
			System.out.print(i+1);
			if(i+1 < 10) { 
				System.out.print(", ");
			}
		}
		// = 표시 30개까지 줄을 출력하기 전에 Enter 를 출력하여
		// 줄바꿈 효과를 내라
		System.out.println("\n" + "=".repeat(30));
		/*
		 * 1 ~ 100까지 숫자를 1 2 3 처럼 빈칸으로 구분하여 출력
		 * 단, 5개의 숫자를 출력한 후 줄바꿈하기
		 * 		1 2 3 4 5
		 * 		6 7 8 9 10 형식으로 출력
		 */
	}

}
