package com.example.be.issue;

import com.example.be.issue.dto.*;
import com.example.be.user.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
public class IssueController {

    private final IssueService issueService;

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

    @GetMapping("/api/issue/{issueNumber}")
    public IssueDetailedDTO showIssue(@PathVariable Integer issueNumber) {
        return issueService.findIssueDetailed(issueNumber);
    }

    @GetMapping("/api/issues")
    public AllLabelsAndMilestonesAndUsersDTO showIssueWriteForm() {
        return issueService.gatherAllEntities();
    }

    @PostMapping("/api/issues")
    public Map<String, Integer> createIssue(@Valid @RequestBody IssueCreateFormDTO issueCreateFormDTO) {
        User testUser = new User("1234", "codesquad", "BE", "https://issue-tracker-03.s3.ap-northeast-2.amazonaws.com/cat.jpg");
        issueCreateFormDTO.setUserId(testUser.getId());
        int issueNumber = issueService.createIssue(issueCreateFormDTO);
        return Map.of("issueNumber", issueNumber);
    }

    @PatchMapping("/api/issues")
    public String updateIssue(@Valid @RequestBody IssueUpdateFormDTO issueUpdateFormDTO) {
        if (issueService.updateIssue(issueUpdateFormDTO)) {
           return "ok";
        }
        return "fail";
    }

    @PatchMapping("/api/issues/assigns")
    public String updateIssueAssigns(@Valid @RequestBody IssueAssignsUpdateFormDTO issueAssignsUpdateFormDTO) {
        if (issueService.updateIssueAssigns(issueAssignsUpdateFormDTO)) {
            return "ok";
        }
        return "fail";
    }

    @PatchMapping("/api/issues/labels")
    public String updateIssueLabelRelation(@Valid @RequestBody IssueLabelRelationUpdateFormDTO issueLabelRelationUpdateFormDTO) {
        if (issueService.updateIssueLabelRelation(issueLabelRelationUpdateFormDTO)) {
            return "ok";
        }
        return "fail";
    }
}
