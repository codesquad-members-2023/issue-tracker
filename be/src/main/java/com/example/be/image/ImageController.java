package com.example.be.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
public class ImageController {

    private final S3UploaderService s3UploaderService;

    public ImageController(S3UploaderService s3UploaderService) {
        this.s3UploaderService = s3UploaderService;
    }

    @PostMapping("api/image")
    public Map<String,String> saveImage(@RequestParam MultipartFile imageFile) throws IOException {

        if (!imageFile.isEmpty()) {
            return Map.of("success", s3UploaderService.upload(imageFile, "images"));
        }

        return Map.of("fail", "image upload fail");
    }
}
