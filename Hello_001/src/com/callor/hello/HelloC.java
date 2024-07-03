package com.callor.hello;

/**
 * 변수 : 데이터를 보관하는 기억장소
 * 변수명 : 보관된 데이터를 재 활용하기 위해 임의로 이름을 부여한다
 * 	첫글자는 영문소문자, 특별히 underBar(_)로 시작할 수 있다
 *  이후 글자는 영문대소문자, 숫자, _ 가 올수있다
 *  2개 이상의 단어를 조합할때는 Camel Case 로 한다
 */
public class HelloC {
	public static void main(String[] args) {
		int num1 = 30;
		int num2 = 40;
		int sum = num1 + num2;
		
		num1 = 100;
		num2 = 0;
		
		System.out.println(sum);
	}

}
