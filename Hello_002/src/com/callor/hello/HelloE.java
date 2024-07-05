package com.callor.hello;

/*
 * prime(int num) method 를 생성하고
 * 매개변수로 전달받은 num 의 값이 소수 인지 판별하여
 * 결과를 return 하기
 */

public class HelloE {
	
	public static boolean prime(int num) {
		for(int i = 2 ; i < num ; i++) {
			if(num % i == 0) {
				return false;
			}
		}
		return true;
	}
	
	public static void main(String[] args) {
		
		int num = 7;
		// 7%2, 7%3, &%4, 7%5, 7%6, 
		// 9%2, 9%3, 9%4, 9%5, 9%6, 9%7, 9%8 
		boolean isPrime = true;
		for(int i = 2 ; i < num ; i++) {
			if(num % i == 0) {
				// num 는 소수가 아니다
				isPrime = false;
				break;
			}
		}
		// for() 명령이 종료되거나, 중단되었을때
		// for() 가 종료 : num 가 소수다
		// for() 가 중단(break) : num 는 소수가 아니다
		if(isPrime) {
			System.out.println(num + " 는 소수이다");
		} else {
			System.out.println(num + " 는 소수가 아니다");
		}
		
		
	}
	

}
