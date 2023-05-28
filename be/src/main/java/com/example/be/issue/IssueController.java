package com.example.be.issue;

import com.example.be.issue.dto.*;
import com.example.be.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class IssueController {

    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/api-fe/issues")
    public FeIssueResponseDTO createFeIssueResponse(@ModelAttribute IssueSearchCondition issueSearchCondition,
                                                    @RequestParam(required = false) Integer cntPage) {
        return issueService.makeFeIssueResponse(issueSearchCondition, cntPage);
    }

    @GetMapping("/api-ios/issues")
    public IosIssueResponseDTO createIosIssueResponse(@ModelAttribute IssueSearchCondition issueSearchCondition,
                                                      @RequestParam(required = false) Integer cntPage) {
        return issueService.makeIosIssueResponse(issueSearchCondition, cntPage);
    }

    @GetMapping("/api/issues")
    public AllEntitiesDTO showIssueWriteForm() {
        return issueService.gatherAllEntities();
    }

    @PostMapping("/api/issues")
    public Map<String, Integer> createIssue(@Validated @RequestBody IssueCreateFormDTO issueCreateFormDTO) {
        User testUser = new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg");
        issueCreateFormDTO.setUserId(testUser.getId());
        int issueNumber = issueService.createIssue(issueCreateFormDTO);
        return Map.of("issueNumber", issueNumber);
    }

    @PatchMapping("/api/issues")
    public String updateIssue(@Validated @RequestBody IssueUpdateFormDTO issueUpdateFormDTO) {
        if (issueService.updateIssue(issueUpdateFormDTO)) {
           return "ok";
        }
        return "fail";
    }

    @PatchMapping("/api/issues/assigns")
    public String updateIssueAssigns(@Validated @RequestBody IssueAssignsUpdateFormDTO issueAssignsUpdateFormDTO) {
        if (issueService.updateIssueAssigns(issueAssignsUpdateFormDTO)) {
            return "ok";
        }
        return "fail";
    }

    @PatchMapping("/api/issues/labels")
    public String updateIssueLabelRelation(@Validated @RequestBody IssueLabelRelationUpdateFormDTO issueLabelRelationUpdateFormDTO) {
        if (issueService.updateIssueLabelRelation(issueLabelRelationUpdateFormDTO)) {
            return "ok";
        }
        return "fail";
    }
}
