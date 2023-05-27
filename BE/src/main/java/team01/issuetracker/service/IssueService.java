package team01.issuetracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team01.issuetracker.service.dto.request.FilterRequestDTO;
import team01.issuetracker.service.dto.response.IssueResponseDTO;
import team01.issuetracker.service.dto.response.IssuesResponseDTO;
import team01.issuetracker.service.vo.Count;
import team01.issuetracker.service.vo.MiniLabel;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    public IssuesResponseDTO openIssues() {
        Count count = Count.builder() // 임시 값(명세서)
                .label(4)
                .milestone(2)
                .opened(2)
                .closed(2)
                .build();
        List<IssueResponseDTO> issues = new ArrayList<>();

        LocalDateTime localDateTime = LocalDateTime.parse("2023-05-10 10:10", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Asia/Seoul"));

        List<String> assignees = new ArrayList<>();
        assignees.add("포코");
        assignees.add("다온");

        List<MiniLabel> labels = new ArrayList<>();
        labels.add(new MiniLabel("FE", "#655CC7"));
        labels.add(new MiniLabel("bug", "#14D6B6"));

        IssueResponseDTO temp01 = new IssueResponseDTO(
                1L
                , "[FE] 이슈"
                , zonedDateTime.toLocalDateTime()
                , assignees
                , labels
                , "테스크01"
                , "포코"
                , "https://avatars.githubusercontent.com/u/101160636?s=40&v=4");
        issues.add(IssueResponseDTO.of(temp01));

        LocalDateTime localDateTime2 = LocalDateTime.parse("2023-05-10 20:20", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zonedDateTime2 = ZonedDateTime.of(localDateTime2, ZoneId.of("Asia/Seoul"));


        List<String> assignees02 = new ArrayList<>();
        assignees02.add("해나");
        assignees02.add("하림");

        List<MiniLabel> labels02 = new ArrayList<>();
        labels02.add(new MiniLabel("iOS", "#655CC7"));

        IssueResponseDTO temp02 = new IssueResponseDTO(
                3L
                , "[iOS] 이슈"
                , zonedDateTime2.toLocalDateTime()
                , assignees02
                , labels02
                , "테스크02"
                , "하림"
                , "https://avatars.githubusercontent.com/u/90844696?s=40&v=4");
        issues.add(IssueResponseDTO.of(temp02));

        return IssuesResponseDTO.of(count, issues);
    }

    public IssuesResponseDTO closeIssues() {
        Count count = Count.builder() // 임시 값(명세서)
                .label(4)
                .milestone(2)
                .opened(2)
                .closed(2)
                .build();
        List<IssueResponseDTO> issues = new ArrayList<>();

        LocalDateTime localDateTime = LocalDateTime.parse("2023-05-10 14:35", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Asia/Seoul"));


        List<String> assignees = new ArrayList<>();
        assignees.add("듀이");
        assignees.add("코어");
        assignees.add("만쥬");

        List<MiniLabel> labels = new ArrayList<>();
        labels.add(new MiniLabel("BE", "#EC8D8D"));
        labels.add(new MiniLabel("bug", "#14D6B6"));

        IssueResponseDTO temp01 = new IssueResponseDTO(
                2L
                , "[BE] 이슈"
                , zonedDateTime.toLocalDateTime()
                , assignees
                , labels
                , "테스크01"
                , "만쥬"
                , "https://avatars.githubusercontent.com/u/20828490?s=40&v=4");
        issues.add(IssueResponseDTO.of(temp01));

        LocalDateTime localDateTime2 = LocalDateTime.parse("2023-05-10 22:22", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zonedDateTime2 = ZonedDateTime.of(localDateTime2, ZoneId.of("Asia/Seoul"));

        List<String> assignees02 = new ArrayList<>();
        List<MiniLabel> labels02 = new ArrayList<>();

        IssueResponseDTO temp02 = new IssueResponseDTO(
                4L
                , "[BE] 테스트"
                , zonedDateTime2.toLocalDateTime()
                , assignees02
                , labels02
                , ""
                , "만쥬"
                , "https://avatars.githubusercontent.com/u/20828490?s=40&v=4");
        issues.add(IssueResponseDTO.of(temp02));

        return IssuesResponseDTO.of(count, issues);
    }

    /*
    TODO: 필터를 활용한 통합 getIssues 서비스 부분(이거 구현 해야함)
     */
    public IssuesResponseDTO getIssues(FilterRequestDTO requestDTO) {
        /*
        TODO: 필터값을 활용해 카운트값을 설정
         */
        Count count = Count.builder() // 필터에 따라서 값이 바뀜
                .label(4)
                .milestone(2)
                .opened(2)
                .closed(2)
                .build();

        /*
        TODO: 필터에 해당하는 이슈 리스트를 생성(스트림 사용)
         */
        List<IssueResponseDTO> issues = new ArrayList<>();

        return IssuesResponseDTO.of(count, issues);
    }
}
