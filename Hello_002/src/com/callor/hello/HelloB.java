package com.callor.hello;

/*
 * 1 ~ 100까지 숫자가 짝수인지 홀수인지 판별하여 출력
 * 		1 : 홀수
 * 		2 : 짝수
 * 		3 : 홀수
 * 
 * 
 */
public class HelloB {
	/*
	 * if() else : 조건문을 판별하기
	 * if(참인조건) else 참이아닌 경우
	 * 		if(num % 2 == 0) 짝수
	 * 		else 짝수가 아님
	 * 이렇게 읽어야 한다.
	 */
	public static void main(String[] args) {
		for(int i = 0 ; i < 100 ; i++) {
			int num = i + 1;
			if( num % 2 == 0) {
				System.out.println( num + ": 짝수");
			} else {
				System.out.println( num + ": 짝수가 아님");
			}
		}
	}

}
