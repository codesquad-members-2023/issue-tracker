package com.example.BE.test;

public class TestDTO {

    private int pk;
    private String test;

    public TestDTO(int pk, String test) {
        this.pk = pk;
        this.test = test;
    }

    public int getPk() {
        return pk;
    }

    public String getTest() {
        return test;
    }
}
