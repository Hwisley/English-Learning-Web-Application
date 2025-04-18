plugins {
    java
    id("org.springframework.boot") version "3.4.3"
    id("io.spring.dependency-management") version "1.1.7"
    id("org.flywaydb.flyway") version "9.22.3"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-mysql")
    implementation("com.mysql:mysql-connector-j:8.0.33")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// Flyway 설정 추가
flyway {
    url = "jdbc:mysql://localhost:3306/${System.getenv("ENG_DB_NAME")}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
    user = System.getenv("ENG_DB_USERNAME")
    password = System.getenv("ENG_DB_PASSWORD")
    locations = arrayOf("classpath:db/migration")
    baselineOnMigrate = true
    driver = "com.mysql.cj.jdbc.Driver"
    validateOnMigrate = true
    cleanDisabled = true
    outOfOrder = false
}
