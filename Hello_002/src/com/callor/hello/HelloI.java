package com.callor.hello;

/*
 * 정수형 배열 100개를 선언하고,
 * 1 ~ 100 범위의 Random 수를 생성하여 배열 100개에 할당하기
 */
public class HelloI {

	public static void main(String[] args) {
		
		System.out.println( (int)(Math.random() * 100 + 1) );
		
		int[] nums = new int[100];
		// 배열에 임의 정수를 할당하는 block
		for(int i = 0 ; i < nums.length ; i++) {
			nums[i] = (int)(Math.random() * 100) + 1;
		}
		
		// 배열에 저장된 값을 출력하는 block
		for(int i = 0 ; i < nums.length ; i++) {
			System.out.print(nums[i] + "  ");
			if((i+1) % 5 == 0 ) System.out.println();
		}
		
		
		
	}
	
}
