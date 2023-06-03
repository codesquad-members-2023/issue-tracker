package team01.issuetracker.aws;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

@RestController
public class FileUploadController {

    @Getter
    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload")
    public PutObjectResponse uploadFile(@RequestParam(value="file") MultipartFile file) {
        return fileUploadService.uploadFile(file);
    }
}