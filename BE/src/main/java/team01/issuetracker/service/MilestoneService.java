package team01.issuetracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team01.issuetracker.service.dto.response.MilestoneDTO;
import team01.issuetracker.service.dto.response.MilestoneResponseDTO;
import team01.issuetracker.service.vo.Count;
import team01.issuetracker.service.vo.MilestoneVO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    /*
    todo: 마일스톤 db와 연결
     */
    public MilestoneResponseDTO getMilestone(String status) {

        Count count = Count.builder() // 임시 값(명세서)
                .label(4)
                .milestone(1)
                .opened(1)
                .closed(1)
                .build();

        List<MilestoneDTO> milestones = new ArrayList<>();
        if (status.equals("open")) {
            LocalDate localDate = LocalDate.parse("2023-05-10");
            milestones.add(MilestoneDTO.of(new MilestoneVO(1L, "테스크01"
                    , "테스크01 내용", localDate, 1L, 1L)));
        } else {
            milestones.add(MilestoneDTO.of(new MilestoneVO(2L, "테스크02"
                    , "테스크02 내용", null, 1L, 0L)));
        }

        return MilestoneResponseDTO.builder()
                .count(count)
                .milestones(milestones)
                .build();
    }
}
