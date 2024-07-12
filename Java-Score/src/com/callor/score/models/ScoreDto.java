package com.callor.score.models;
/*
 * 
 * Dto(Data Transfer Object)
 * VO(Value Object) 와 같은 형식의 data class
 * 
 */
public class ScoreDto {
	// 성적처리를 하기 위하여 성적정보를 추상화 하여 
	// 필요항목만 추출한 것
	
	// 학번,국어,영어,수학,음악,미술,소프트웨어공학,데이터베이스
	public String sc_num;
	public int sc_kor;
	public int sc_eng;
	public int sc_math;
	public int sc_music;
	public int sc_art;
	public int sc_sw;
	public int sc_db;
	
	public int total() {
		int total = sc_kor;
		total += sc_eng;
		total += sc_math;
		total += sc_music;
		total += sc_art;
		total += sc_sw;
		total += sc_db;
		return total;
	}
	public float average() {
		return (float)this.total() / 7;
	}
	
	@Override
	public String toString() {
		return "ScoreDto [sc_num=" + sc_num + ", sc_kor=" + sc_kor + ", sc_eng=" + sc_eng + ", sc_math=" + sc_math
				+ ", sc_music=" + sc_music + ", sc_art=" + sc_art + ", sc_sw=" + sc_sw + ", sc_db=" + sc_db + "]";
	}

}
