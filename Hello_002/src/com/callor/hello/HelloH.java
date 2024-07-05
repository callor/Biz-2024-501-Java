package com.callor.hello;

/*
 * 정수형 배열 100개를 선언하고
 * 0 번 배열 부터 순서대로 1 ~ 100까지 정수를 저장하기
 */
public class HelloH {
	
	public static void main(String[] args) {
		int[] nums = new int[100];
		
		nums[0] = 1;
		nums[1] = 2;
		
		for(int i = 0 ; i < nums.length ; i++) {
			nums[i] = i + 1;
		}
	}

}
