package org.ntg.learn2code.model;

import jakarta.persistence.*;

@Entity
@Table(name = "divisions")
public class Division {
    @Id
    @SequenceGenerator(name = "divisions_id_seq", sequenceName = "divisions_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "divisions_id_seq")
    private Long id;

    private String name;
    private String description;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
}
