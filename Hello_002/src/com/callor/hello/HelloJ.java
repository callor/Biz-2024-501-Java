package com.callor.hello;

/*
 * 10 ~ 50 범위의 임의 Random 정수 1개를 생성하고
 * 생성한 Random 수 만큼의 정수형 배열을 선언하고
 * 배열의 각 요소에 1 ~ 100까지 범위의 Random 수를 저장
 * 배열에 저장된 값을 출력 
 */
public class HelloJ {
	
	public static void main(String[] args) {
		/*
		 * Math.random() : 0 ~ 1 미만의 실수(0.9999999~~~, 0.9)
		 * 10 ~ 50 까지의 정수를 만들려면
		 * 먼저 0.99 * x = 50 - 10
		 */
		int length = (int)(Math.random() * 41) + 10;
		System.out.println(length);
		
		int[] nums = new int[length];
		for(int i = 0 ; i < nums.length ; i++) {
			nums[i] = (int)(Math.random() * 100) + 1;
		}
		
		for(int num : nums) {
			System.out.print(num);
			System.out.print(" ");
		}
		System.out.println("\n"+"=".repeat(30));
		
		// 생성된 nums 의 요소들 전체를 합산하고, 평균을 계산하여 출력
		// 평균은 소수점이하 2째자리 까지 출력
		int sum = 0;
		float avg = 0;
		for(int num : nums) {
			sum += num;
		}
		avg = (float)sum / nums.length;
		System.out.printf("배열의 합계 : %d\n",sum);
		System.out.printf("배열의 평균 : %.2f\n",avg);
		
	}

}
