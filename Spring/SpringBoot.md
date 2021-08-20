### Spring Boot 属性注入方式

#### 1 使用`@ConfigurationProperties`注入到配置类中

```java
package cn.xu.config;


import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 从配置文件 application.properties 中读取配置文件
 * 配置项中的变量名要与，前缀之后的变量名保持一致
 */

@ConfigurationProperties(prefix = "jdbc")
public class JdbcProperties {
    private String driverClassName;
    private String url;
    private String username;
    private String password;

    public String getDriverClassName() {
        return driverClassName;
    }

    public void setDriverClassName(String driverClassName) {
        this.driverClassName = driverClassName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

```



#### 2 在方法上使用`@ConfigurationProperties`实现自动注入

```java
package cn.xu.config;


import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

/**
 * JDBC 配置
 */

@Configuration
//@PropertySource("classpath:jdbc.properties") 用值注入的方式
//@EnableConfigurationProperties(JdbcProperties.class) // 用配置类注入的方式,需要使用这个注解读取配置类
public class JdbcConfig {
    @Bean
    @ConfigurationProperties(prefix = "jdbc") // 自动注入,jdbc.xxx,xxx要和配置名称需要根据Druid配置项属性名一致
    public DataSource dataSource() {
        return new DruidDataSource();
    }
}

```







#### 多个yml文件配置





#### 自动配置流程





#### SpringBoot 配置 SpringMVC 拦截器	

