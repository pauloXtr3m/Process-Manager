package com.softplan.process.server.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    @JsonIgnore
    private LocalDateTime dateOfCreation;

    @ManyToOne
    @Getter
    @Setter
    private LegalProcess legalProcess;

    @ManyToOne
    @Getter
    @Setter
    private User author;
}
