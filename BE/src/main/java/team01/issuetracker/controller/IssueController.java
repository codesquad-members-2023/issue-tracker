package team01.issuetracker.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team01.issuetracker.service.IssueService;
import team01.issuetracker.service.dto.request.FilterRequestDTO;
import team01.issuetracker.service.dto.request.IssueRequestDTO;
import team01.issuetracker.service.dto.response.CreateIssueDTO;
import team01.issuetracker.service.dto.response.IssueDetailResponseDTO;
import team01.issuetracker.service.dto.response.IssuesResponseDTO;

@Slf4j
@Tag(name = "Issue", description = "이슈 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/issues")
@RestController
public class IssueController {

    private final IssueService issueService;

    @Operation(summary = "이슈 목록 조회")
    @GetMapping
    public ResponseEntity<IssuesResponseDTO> view(FilterRequestDTO requestDTO) {
        log.debug("이슈 필터 호출");
        return ResponseEntity.ok(issueService.getIssues(requestDTO));
    }

    @Operation(summary = "새로운 이슈 작성")
    @PostMapping
    public ResponseEntity<CreateIssueDTO> create(@RequestBody IssueRequestDTO issueDTO) {
        log.debug("이슈 생성");
        issueService.create(issueDTO);

        Long creatIssueId = issueService.create(issueDTO);

        // 생성된 이슈 번호를 응답으로 반환
        CreateIssueDTO responseDTO = new CreateIssueDTO(creatIssueId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @Operation(summary = "이슈 상세 보기")
    @GetMapping("/{id}")
    public ResponseEntity<IssueDetailResponseDTO> detailView(@PathVariable Long id) {
        log.debug("이슈 상세보기");
        return ResponseEntity.ok(issueService.getIssue(id));
    }
}
