package team01.issuetracker.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team01.issuetracker.service.MilestoneService;

@RequiredArgsConstructor
@RequestMapping("/api/milestones")
@RestController
public class MilestoneController {

    private final MilestoneService milestoneService;
    private final Logger logger = LoggerFactory.getLogger(MilestoneController.class);

    @GetMapping
    public ResponseEntity<?> milestoneView(@RequestParam("status") String status) {
        logger.info(status + " 마일스톤 조회");
        return ResponseEntity.ok(milestoneService.getMilestone(status));
    }
}
