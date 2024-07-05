package com.callor.hello;

/*
 * 정수형 배열 50개를 선언하고
 * 정수 2 ~ 100 범위의 Random 수를 각각 생성하여
 * 배열 요소에 저장
 * 
 * 배열에 저장된 정수들 중에 prime 수만 합산하여 출력
 * 배열에 저장된 정수들 중에 prime 수가 몇개인가 출력
 * 
 */
public class HelloM {
	
	/*
	 * 매개변수로 전달받은 정수값을 검사하여
	 * prime 수이면 매개변수로 전달받은 정수값을 그대로 return
	 * 그렇지 않으면 0 을 return
	 */
	public static int prime(int num) {
		for(int i = 2 ; i < num ; i++) {
			if(num % i == 0) return 0;
		}
		return num;
	}
	
	
	public static void main(String[] args) {
		int[] nums = new int[50];
		
		// 생성된 배열에 Ramdon 수 할당하기
		for(int i = 0 ; i < nums.length ; i++) {
			// 2 ~ 100까지 범위의 Random 생성하기
			nums[i] = (int)(Math.random() * 99) + 2;
		}
		
		int sum = 0;
		int count = 0;
		for(int num : nums) {
			// prime() method 는 num 값이 소수이면 num 가 그대로 return
			// 그렇지 않으면 0이 return 된다
			// return 된 값을 그대로 sum 변수에 누적하면(Summury)
			// 결과적으로 소수들만 합산하는 효과가 된다
			int result = prime(num);
			sum += result;
			if(result > 0) count++;
		}
		System.out.println("=".repeat(30));
		System.out.printf("합계: %d\n",sum);
		System.out.printf("개수: %d\n",count);
		System.out.printf("평균: %.2f\n",(float)sum / count);
		System.out.println("=".repeat(30));
		
	}

}
