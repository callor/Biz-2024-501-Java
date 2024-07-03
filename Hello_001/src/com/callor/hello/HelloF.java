package com.callor.hello;

/*
 * main method() 를 선언하고
 * 정수 30과 40을 변수에 저장하고
 * 1. 정수 30과 40을 덧셈하고
 * 2. 정수 30과 덧셈한 결과를 뺄셈하고
 * 3. 정수 40과 뺄셈한 결과를 곱셈하고
 * 4. 덧셈한 결과와 뺄셈한 결과를 나눗셈
 */
public class HelloF {
	
	public static void main(String[] args) {
		int num1 = 30;
		int num2 = 40;
		int plus = num1 + num2;
		int minus = num1 - plus;
		int times = num2 * minus;
		float div = (float)plus / minus;
		System.out.println(num1 + " + " + num2 + " = " + plus);
		System.out.printf("%d + %d = %d\n",num1, num2, plus);
		System.out.printf("%d - %d = %d\n",num1, plus, minus);
		System.out.printf("%d * %d = %d\n",num2, minus, times);
		System.out.printf("%d ÷ %d = %.2f\n",plus, minus, div);
	}
}
