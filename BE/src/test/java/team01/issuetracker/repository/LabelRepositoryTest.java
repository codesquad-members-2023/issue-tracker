package team01.issuetracker.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@SpringBootTest
@Sql("/test-schema.sql")
@Sql("/test-data.sql")
class LabelRepositoryTest {
    @Autowired
    LabelRepository labelRepository;

}