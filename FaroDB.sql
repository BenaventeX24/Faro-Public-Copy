drop  database if exists FARO;
create database FARO;
use FARO;

create table CENTRE(
idCentre INT auto_increment primary key,
centreName varchar(250) not null unique,
free boolean not null,
addressStreet varchar(250) not null,
addressNumber int not null,
latitude double not null,
longitude double not null,
idSchoolarLevel int,
phoneNumber int
);

create table CAREER(
idCareer INT auto_increment primary key,
careerName varchar(250) not null unique,
careerDescription text not null,
degree varChar(250) not null,
duration varchar(50) not null
);

create table KEYWORD(
idKeyword int auto_increment primary key,
keyword varchar(50) unique not null
);

create table SCHEDULES(
idSchedule int auto_increment primary key,
centreSchedule varChar(20) unique not null
);

create table SCHOOLARLEVEL(
idSchoolarLevel int auto_increment primary key,
schoolarLevel varChar(20) unique not null
);

ALTER TABLE CENTRE
ADD FOREIGN KEY (idSchoolarLevel) REFERENCES SCHOOLARLEVEL(idSchoolarLevel);

create table CENTRE_SCHEDULES(
idCentre int,
idSchedule int,

primary key(idCentre, idSchedule),
foreign key (idCentre) references CENTRE(idCentre),
foreign key (idSchedule) references SCHEDULES(idSchedule)
);

create table CENTRE_CAREER(
idCentre int,
idCareer int,

primary key(idCentre, idCareer),
foreign key (idCentre) references CENTRE(idCentre),
foreign key (idCareer) references CAREER(idCareer)
);

create table CAREER_KEYWORD(
idCareer int,
idKeyword int,

primary key(idCareer,idKeyword),
foreign key (idCareer) references CAREER(idCareer),
foreign key (idKeyword) references KEYWORD(idKeyword)
);

/* ------------------------ Procedures ------------------------ */

delimiter //
Create procedure DBFiller_Career_VinculateKeyword(in keywordP varChar(50), idCareerP int)
Begin 
    DECLARE searchKeywordId INT default 0;
    set searchKeywordId = (select idKeyword from KEYWORD where keyword=keywordP);
    if searchKeywordId!=0 then
        insert into CAREER_KEYWORD values(idCareerP, searchKeywordId);
    else
        insert into KEYWORD(keyword) values(keywordP);
        set searchKeywordId = (select idKeyword from KEYWORD where keyword=keywordP);
        insert into CAREER_KEYWORD values(idCareerP, searchKeywordId);
    end if;
End //
delimiter ;

delimiter //
Create procedure DBFiller_Centre_VinculateSchedules(in idCentreP int, scheduleP varChar(20))
Begin 
    DECLARE searchSchedule INT default 0;
    set searchSchedule = (select idSchedule from SCHEDULES where centreSchedule=scheduleP);
    if searchSchedule!=0 then
        insert into CENTRE_SCHEDULES values(idCentreP, searchSchedule);
    else
        insert into SCHEDULES(centreSchedule) values(scheduleP);
        set searchSchedule = (select idSchedule from SCHEDULES where centreSchedule=scheduleP);
        insert into CENTRE_SCHEDULES values(idCentreP, searchSchedule);
    end if;
End //
delimiter ;

delimiter //
Create procedure DBFiller_Centre_VinculateSchoolarLevel(in idCentreP int, schoolarLevelP varChar(20))
Begin 
    DECLARE searchLevel INT default 0;
    set searchLevel = (select idSchoolarLevel from SCHOOLARLEVEL where schoolarLevel=schoolarLevelP);
    if searchLevel!=0 then
        update CENTRE set idSchoolarLevel=searchLevel where idCentre=idCentreP;
    else
        insert into SCHOOLARLEVEL(schoolarLevel) values(schoolarLevelP);
        set searchLevel = (select idSchoolarLevel from SCHOOLARLEVEL where schoolarLevel=schoolarLevelP);
        update CENTRE set idSchoolarLevel=searchLevel where idCentre=idCentreP;
    end if;
End //
delimiter ;

delimiter //
Create procedure DBFiller_Centre_Delete(in idCentreP int)
Begin 
    delete from CENTRE_CAREER where idCentre=idCentreP;
    delete from CENTRE_SCHEDULES where idCentre=idCentreP;
    delete from CENTRE where idCentre= idCentreP;
End //
delimiter ;

delimiter //
Create procedure DBFiller_Keywords_Clear(in idKeywordP int)
Begin 
    DECLARE vinculatedCareers INT default 0;
    set vinculatedCareers=(select count(idKeyword) as total from CAREER_KEYWORD where idKeyword=idKeywordP);
    if(vinculatedCareers=0)  then
        delete from KEYWORD where idKeyword=idKeywordP;
    end if;
    End //
delimiter ;

delimiter //
Create procedure DBFiller_Career_DesvinculateCentre(in idCareerP int, idCentreP int)
Begin 
    DECLARE vinculatedCentres INT default 0;
    set vinculatedCentres=(select count(idCareer) as total from CENTRE_CAREER where idCareer=idCareerP);
    if(vinculatedCentres=1 OR vinculatedCentres=0)  then
        delete from CENTRE_CAREER where idCareer = idCareerP;
        delete from CAREER_KEYWORD where idCareer = idCareerP;
        delete from CAREER where idCareer = idCareerP;
    else
        delete from CENTRE_CAREER where idCentre = idCentreP and idCareer = idCareerP;
    end if;
End //
delimiter ;

create table SAVE(
idSaveCareer int auto_increment,
idCareer INT,
careerName varchar(250) not null unique,
careerDescription text not null,
degree varChar(250) not null,
duration varchar(50) not null,
primary key (idSaveCareer)
);

create table SAVE_CAREER(
idSaveCareer int,
idCareer int,
primary key(idSaveCareer),
foreign key (idSaveCareer) references SAVE (idSaveCareer),
foreign key (idCareer) references CAREER (idCareer)
);

delimiter //
create trigger SAVE_CARRER_AI
after insert on CAREER
for each row
begin
	insert into SAVE(idSaveCareer, idCareer, careerName, careerDescription, degree, duration)
		value (idSaveCareer, new.idCareer, new.careerName, new.careerDescription, new.degree, new.duration);
end //
delimiter ;

/* ------------------------ Fin Procedures ------------------------ */

/*---------------------------- Ejecutar en orden dado ----------------------------*/

insert into SCHOOLARLEVEL(schoolarLevel) values("Bachillerato");
insert into CENTRE values(idCentre,"??nima",false, "Canelones",1162,-34.908812, -56.190687,1,29093640);
insert into SCHEDULES(centreSchedule) values("Completo");
insert into CENTRE_SCHEDULES values(1, 1);

insert into CAREER values(idCareer,"TIC","Su ??rea principal es tiene la formaci??n aquellas vinculadas a las l??neas de desarrollo /programaci??n, testing e infraestructura tecnol??gica.","Dise??ador Web Junior","Tres a??os");
insert into KEYWORD(keyword) values("Inform??tica");
insert into CAREER_KEYWORD values(1, 1);
insert into KEYWORD(keyword) values("Programaci??n");
insert into CAREER_KEYWORD values(1, 2);
insert into KEYWORD(keyword) values("Tecnolog??a");
insert into CAREER_KEYWORD values(1, 3);

insert into CAREER values(idCareer,"Administraci??n","La Administraci??n de Empresas es una ciencia social, econ??mica y de car??cter t??cnico. Tiene como objetivo principal lograr el m??ximo beneficio posible para una entidad. Logra esto mediante la organizaci??n, planificaci??n, direcci??n y control de los recursos que tiene a su disposici??n.","Gerente de Empresas Junior","Tres a??os");
insert into KEYWORD(keyword) values("Administraci??n");
insert into CAREER_KEYWORD values(2, 4);
insert into KEYWORD(keyword) values("Empresas");
insert into CAREER_KEYWORD values(2, 5);

insert into CENTRE_CAREER values(1,1);
insert into CENTRE_CAREER values(1,2);

insert into SCHOOLARLEVEL(schoolarLevel) values("Universidad");
insert into CENTRE values(idCentre,"ORT Pocitos",false,"Blvr. Espa??a",2633,-34.912562, -56.156688,2,29021505);
insert into SCHEDULES(centreSchedule) values("Matutino");
insert into SCHEDULES(centreSchedule) values("Vespertino");
insert into SCHEDULES(centreSchedule) values("Nocturno");
insert into CENTRE_SCHEDULES values(2, 2);
insert into CENTRE_SCHEDULES values(2, 3);
insert into CENTRE_SCHEDULES values(2, 4);

insert into CAREER values(idCareer,"Licenciatura en Diase??o, Arte y Tecnologia","Esta propuesta, transversal e integral, est?? articulada por proyectos art??sticos y expresivos que incrementan sus niveles de complejidad a partir de la asimilaci??n de herramientas metodol??gicas y recursos tecnol??gicos por parte de los alumnos, adecuados a las m??ltiples posibilidades y desaf??os de esta ??poca.","Licenciado/a en Diase??o, Arte y Tecnologia","Cuatro a??os");
insert into CAREER values(idCareer,"Ingenier??a en sistemas","La carrera Ingenier??a en Sistemas te permitir?? desarrollarte como creador de software y te brindar?? las herramientas para construir soluciones innovadoras en uno de los sectores con mayor demanda en Uruguay y en el mundo.","Ingeniero en Sistemas","Cinco a??os");
insert into KEYWORD(keyword) values("Arte");
insert into CAREER_KEYWORD values(3, 6);
insert into CAREER_KEYWORD values(3, 3);
insert into KEYWORD(keyword) values("Ingenier??a");
insert into CAREER_KEYWORD values(4, 7);
insert into CAREER_KEYWORD values(4, 2);

insert into CENTRE_CAREER values(2,3);
insert into CENTRE_CAREER values(2,4);
/*---------------------------- Ejemplos usando los stored procedures ----------------------------*/

insert into CENTRE values(idCentre,"I.T.S",true,"Bv Jos?? Battle y Ordo??ez y Gral Flores",3705,-34.861812,-56.169187,1,22159848);

insert into CAREER values(idCareer,"MEC??NICA AUTOMOTRIZ","El estudiante ser?? capaz de reparar y ajustar motores encendidos por chispa y motores di??sel y aplicar conocimientos t??cnico-tecnol??gicos utilizando e interpretando los manuales y datos del fabricante en el armado del motor y sistemas perif??ricos.","Mec??nico automotr??z","Tres a??os");
call DBFiller_Centre_VinculateSchoolarLevel(3, "Bachillerato");
call DBFiller_Centre_VinculateSchedules(3,"Matutino");
call DBFiller_Centre_VinculateSchedules(3,"Vespertino");
call DBFiller_Centre_VinculateSchedules(3,"Nocturno");
call DBFiller_Career_VinculateKeyword("Autos",5);
call DBFiller_Career_VinculateKeyword("Mec??nica",5);
call DBFiller_Career_VinculateKeyword("Motores",5);

insert into CAREER values(idCareer,"Gastronom??a","El estudiante ser?? capaz de Operar los diferentes equipos, instrumentos, m??quinas y herramientas, para el desarrollo de la profesi??n y aplicar t??cnicas de producci??n y de servicios, considerando los aspectos higi??nicos-sanitarios, socio-ambientales e hist??rico - culturales.","T??cnico en Gastronom??a","Dos a??os");
call DBFiller_Career_VinculateKeyword("Cocina",6);
call DBFiller_Career_VinculateKeyword("Comida",6);
call DBFiller_Career_VinculateKeyword("Gastronom??a",6);

insert into CAREER values(idCareer,"T??cnico Forestal","Conocer y supervisar  ??tica y profesionalmente el desarrollo de las tareas de manejo de viveros forestales, producci??n de plantines, implantaci??n de montes y sus cuidados post-plantaci??n, manejo, medici??n y explotaci??n de bosques forestales, garantizando que se realicen con calidad y en forma segura para los trabajadores y el medio ambiente, generando el menor impacto ambiental posible","T??cnico Forestal","Dos a??os");
call DBFiller_Career_VinculateKeyword("??rboles",7);
call DBFiller_Career_VinculateKeyword("Bot??nica",7);
call DBFiller_Career_VinculateKeyword("Silvicultura",7);

insert into CENTRE_CAREER values(3,5);
insert into CENTRE_CAREER values(3,6);

create or replace view CENTRES_VW as select idCentre, centreName, free, addressStreet, addressNumber, latitude, longitude, phoneNumber, schoolarLevel, group_concat(centreSchedule) as centreSchedules from CENTRE natural left join CENTRE_SCHEDULES natural left join SCHOOLARLEVEL natural left join SCHEDULES group by (idCentre);
create or replace view CAREERS_VW as select idCareer, careerName, careerDescription, degree, duration, group_concat(keyword) as keywords from CAREER natural join CAREER_KEYWORD natural join KEYWORD group by idCareer;
 
 grant select on FARO.CENTRES_VW to 'FaroUser'@'localhost';
 grant select on FARO.CAREERS_VW to 'FaroUser'@'localhost';
 grant select on FARO.CENTRE_CAREER to 'FaroUser'@'localhost';

grant select, execute, delete, update, insert on FARO.* to 'DBAdmin'@'localhost';

flush Privileges;
