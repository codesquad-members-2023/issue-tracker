package com.example.be.util;

public class Paging {

    private static final int cntPerPage = 16;        // 페이지당 게시글 수
    private static final int cntPage = 5;           // 한 화면에 보여지는 페이지의 개수
    private int nowPage;
    private int startPage;
    private int endPage;
    private int lastPage;
    private int startIndex;

    public Paging() {
    }

    public Paging(Integer nowPage, int total) {
        if (nowPage == null) {
            nowPage = 1;
        }
        this.nowPage = nowPage;
        calcLastPage(total);
        calcStartEndPage(nowPage);
        calcStart(nowPage);
    }

    public void calcLastPage(int total) {
        lastPage = ((int) Math.ceil((double) total / (double) cntPerPage));
    }

    public void calcStartEndPage(int nowPage) {
        endPage = ((int)Math.ceil((double) nowPage / (double) cntPage) * cntPage);
        if (lastPage < endPage) {
            endPage = lastPage;
        }
        startPage = (endPage - cntPage + 1);
        if (startPage < 1) {
            startPage = 1;
        }
    }

    public void calcStart(int nowPage) {
        startIndex = (nowPage * cntPerPage - cntPerPage);
    }

    public int getNowPage() {
        return nowPage;
    }

    public int getStartPage() {
        return startPage;
    }


    public int getEndPage() {
        return endPage;
    }

    public int getCntPerPage() {
        return cntPerPage;
    }

    public int getLastPage() {
        return lastPage;
    }

    public int getStartIndex() {
        return startIndex;
    }
}
