package team01.issuetracker.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team01.issuetracker.service.IssueService;
import team01.issuetracker.service.dto.request.FilterRequestDTO;

@RequiredArgsConstructor
@RequestMapping("/api/issues")
@RestController
public class IssueController {

    private final IssueService issueService;
    private final Logger logger = LoggerFactory.getLogger(IssueController.class);

    @GetMapping
    public ResponseEntity<?> view(FilterRequestDTO requestDTO) {
        logger.info("그 리퀘파람 테스트 임돠");

        /*
        TODO: 기존 열림/닫힘 통합 기능으로 합쳐야함
         */
        if (requestDTO.getStatus().equals("open")) {
            logger.info("오픈 이슈 페이지");
            return ResponseEntity.ok(issueService.openIssues());
        }
        if (requestDTO.getStatus().equals("closed")){
            logger.info("클로즈 이슈 페이지");
            return ResponseEntity.ok(issueService.closeIssues());
        }

//        System.out.println(requestDTO.getStatus());
//        System.out.println(requestDTO.getAssignee());
//        System.out.println(requestDTO.getLabel());
//        System.out.println(requestDTO.getMilestone());
//        System.out.println(requestDTO.getWriters());

        /*
        TODO: 통합 기능으로 구현시 사용되는 부분, 필터의 값들은 id로 들어간다!(open/closed 빼고)
         */
        return ResponseEntity.ok(issueService.getIssues(requestDTO));
    }
}
