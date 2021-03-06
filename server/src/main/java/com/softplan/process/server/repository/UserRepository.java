package com.softplan.process.server.repository;

import com.softplan.process.server.model.User;
import com.softplan.process.server.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
        User findByEmail(String email);
        List<User> findAllByUserGroup(UserGroup userGroup);

        @Query("select distinct(u) from User u " +
                " left join UserGroup ug " +
                " where ug.name = ?1 ")
        List<User> findAllByGroup(String name);
}
