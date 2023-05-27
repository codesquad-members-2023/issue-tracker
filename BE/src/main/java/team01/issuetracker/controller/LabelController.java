package team01.issuetracker.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team01.issuetracker.service.LabelService;

@RequiredArgsConstructor
@RequestMapping("/api/labels")
@RestController
public class LabelController {

    private final LabelService labelService;
    private final Logger logger = LoggerFactory.getLogger(LabelController.class);

    @GetMapping
    public ResponseEntity<?> labelsView() {
        logger.info("전체 라벨 조회");
        return ResponseEntity.ok(labelService.getLabels());
    }
}
