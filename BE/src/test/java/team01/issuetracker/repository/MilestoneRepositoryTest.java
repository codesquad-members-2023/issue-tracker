package team01.issuetracker.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team01.issuetracker.domain.Milestone;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@SpringBootTest
@Sql("/test-schema.sql")
@Sql("/test-data.sql")
class MilestoneRepositoryTest {
    @Autowired
    MilestoneRepository milestoneRepository;

    @DisplayName("마일스톤 객체 제목과 저장한 마일스톤 객체 제목은 같아야한다")
    @Test
    void save() {
        Milestone newMilestone = Milestone.builder().title("듀이").isOpen(true).build();

        Milestone saveMilestone = milestoneRepository.save(newMilestone);

        assertThat(saveMilestone.getTitle()).isEqualTo(newMilestone.getTitle());
    }

    @DisplayName("마일스톤 전체를 반환한 list 길이와 레포지토리에 저장된 길이는 같아야한다.")
    @Test
    void findByAll() {
        Milestone BEmilestone = Milestone.builder().title("BE").isOpen(true).build();
        Milestone FEmilestone = Milestone.builder().title("FE").isOpen(true).build();
        Milestone iOSmilestone = Milestone.builder().title("iOS").isOpen(true).build();
        List<Milestone> milestones = List.of(BEmilestone, FEmilestone, iOSmilestone);
        milestoneRepository.saveAll(milestones);
        List<Milestone> list = milestoneRepository.findAll();

        assertThat(list.size()).isEqualTo(milestones.size());
    }

    @DisplayName("저장한 마일스톤 리스트 크기와 저장 후 마일스톤 레포의 크기는 같아야 한다.")
    @Test
    void countAll() {
        Milestone BEmilestone = Milestone.builder().title("BE").isOpen(true).build();
        Milestone FEmilestone = Milestone.builder().title("FE").isOpen(true).build();
        Milestone iOSmilestone = Milestone.builder().title("iOS").isOpen(true).build();
        List<Milestone> milestones = List.of(BEmilestone, FEmilestone, iOSmilestone);
        milestoneRepository.saveAll(milestones);

        assertThat(milestoneRepository.count()).isEqualTo(milestones.size());
    }
}
