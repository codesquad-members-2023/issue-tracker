package com.example.BE.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public TestDTO test() {
        return new TestDTO(3, "팀03 화이팅");
    }

}
