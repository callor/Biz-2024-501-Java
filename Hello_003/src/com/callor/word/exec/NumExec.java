package com.callor.word.exec;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class NumExec {
	
	public static void main(String[] args) {
		List<Integer> nums = new ArrayList<>();
		for(int i = 0 ; i < 45 ; i++) {
			nums.add(i+1);
		}
		Collections.shuffle(nums);
		
		List<Integer> result = new ArrayList<Integer>();
		
		for(int i = 0 ; i < 6 ; i++) {
			result.add(nums.get(i));
		}
		
		Collections.sort(result);
		System.out.println(result);
		
	}

}
