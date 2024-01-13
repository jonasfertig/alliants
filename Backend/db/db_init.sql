-- initialization of hackathon tables

DROP TABLE IF EXISTS "class";
CREATE TABLE "public"."class" (
    "name" character varying(4) NOT NULL,
    CONSTRAINT "class_name" PRIMARY KEY ("name")
) WITH (oids = false);

INSERT INTO "class" ("name") VALUES
('11a'),
('12a'),
('11b'),
('12b');

DROP TABLE IF EXISTS "delivery";
DROP SEQUENCE IF EXISTS delivery_delivery_id_seq;
CREATE SEQUENCE delivery_delivery_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."delivery" (
    "delivery_id" integer DEFAULT nextval('delivery_delivery_id_seq') NOT NULL,
    "extracted_text" text,
    "student_id" integer NOT NULL,
    "task_id" integer NOT NULL,
    "feedback" text NOT NULL,
    "feedback_approved" boolean NOT NULL,
    CONSTRAINT "delivery_pkey" PRIMARY KEY ("delivery_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "student";
DROP SEQUENCE IF EXISTS student_student_id_seq;
CREATE SEQUENCE student_student_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."student" (
    "student_id" integer DEFAULT nextval('student_student_id_seq') NOT NULL,
    "firstname" character varying(20) NOT NULL,
    "lastname" character varying(20) NOT NULL,
    "class" character varying(4),
    CONSTRAINT "student_pkey" PRIMARY KEY ("student_id")
) WITH (oids = false);

INSERT INTO "student" ("student_id", "firstname", "lastname", "class") VALUES
(1,	'Adem',	'Kokud',	'11a'),
(2,	'Jonathan',	'Baumann',	'11a'),
(3,	'Jan',	'Gfrerer',	'11a'),
(4,	'Jonas',	'Fertig',	'11a');

DROP TABLE IF EXISTS "task";
DROP SEQUENCE IF EXISTS task_task_id_seq;
CREATE SEQUENCE task_task_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."task" (
    "task_id" integer DEFAULT nextval('task_task_id_seq') NOT NULL,
    "assistant_id" character varying(100),
    "base_prompt" text,
    "solution_file_id" character varying(100),
    "teacher_id" integer,
    "task_file_id" character varying(100),
    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
) WITH (oids = false);

INSERT INTO "task" ("task_id", "assistant_id", "base_prompt", "solution_file_id", "teacher_id", "task_file_id") VALUES
(1,	'asst_5lLE9gPDKCvRpXZXGrfZItJP',	'You''re a helpful teacher assistant, who corrects the exercises of the students. You have the Exercises and it''s suggested solution, base your scoring and feedback on this. You count the received points and give feedback if the student doesn''t get the full points, how he or she can get the full points the next time. Be friendly and funny.',	NULL,	1,	NULL);

DROP TABLE IF EXISTS "teacher";
DROP SEQUENCE IF EXISTS teacher_teacher_id_seq;
CREATE SEQUENCE teacher_teacher_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."teacher" (
    "teacher_id" integer DEFAULT nextval('teacher_teacher_id_seq') NOT NULL,
    "firstname" character varying(30) NOT NULL,
    "lastname" character varying(30) NOT NULL,
    CONSTRAINT "teacher_email_key" UNIQUE ("lastname"),
    CONSTRAINT "teacher_pkey" PRIMARY KEY ("teacher_id")
) WITH (oids = false);

INSERT INTO "teacher" ("teacher_id", "firstname", "lastname") VALUES
(1,	'Arno',	'Dübel');

ALTER TABLE ONLY "public"."delivery" ADD CONSTRAINT "delivery_student_id_fkey" FOREIGN KEY (student_id) REFERENCES student(student_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."delivery" ADD CONSTRAINT "delivery_task_id_fkey" FOREIGN KEY (task_id) REFERENCES task(task_id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."student" ADD CONSTRAINT "student_class_fkey" FOREIGN KEY (class) REFERENCES class(name) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."task" ADD CONSTRAINT "task_teacher_id_fkey" FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) NOT DEFERRABLE;
