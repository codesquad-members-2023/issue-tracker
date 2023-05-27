package team01.issuetracker.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team01.issuetracker.domain.Member;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Transactional
@SpringBootTest
@Sql("/test-schema.sql")
@Sql("/test-data.sql")
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;


    @DisplayName("전체 멤버 출력")
    @Test
    void findAll() {
        List<Member> members = memberRepository.findAll();

        Map<Long, Member> memberMap = members.stream()
                .collect(Collectors.toMap(member -> member.getId(), member -> member));

        assertThat(memberMap.size()).isEqualTo(members.size());

        assertThat(members.size()).isEqualTo(memberRepository.count());
    }

}