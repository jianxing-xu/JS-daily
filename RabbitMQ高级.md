## RabbitMq 高级特性

### 消息可靠性传递

  在使用RabbitMQ的时候，作为消息发送方希望杜绝任何消息丢失或者投递失败场景。RabbitMQ 为我们提供了两种方式用来控制消息的投递可靠性模式。

  + confirm 确认模式
  + return 退回模式

  rabbitmq 整个消息的投递线路为：

  producer ---> rabbit-broker ---> exchange ---> queue ---> consumer

  + 消息从 producer 到 exchange 会返回一个回调 confirmCallback
  + 消息从 exchange 到 queue 投递失败会返回一个回调 returnCallback

  **confirm步骤**
  1. 设置 publisher-confirms 为 true
  2. 使用 rabbitmqTemplate.setConfirmCallback 设置回调函数，当消息发送到exchange后回调callback方法，在方法总判断ack，为 true 则消息发送成功，为 false 则消息发送失败，需要进行另外处理。

  **return步骤**
  1. 设置ConnectionFactory的publisher-returns="true" 开启退回模式。
  2. 使用rabbitTemplate.setReturnCallback设 置退回函数，当消息从exchange路由到queue失败后，如果设置了rabbitTemplate.selMandatory(true)参数，则会将消息退回给producer。并执行回调函数returnedMessage.


### ConsumerACK

  消费者是否成功消费消息，没有成功消费消息的话可以进行 requeue 重回队列重新发送消息

### 消费端限流

限制消费端流量 需要配置成手动确认消息模式 
1. 配置 spring.listener.direct.prefetch = 1 //限制每次拉取一条消息进行消费，直到消息被确认后才拉取下一条消息进行消费

### TTL

### 死信队列

![死信队列](https://xujianxing.oss-cn-beijing.aliyuncs.com/2020-11-29/%E6%AD%BB%E4%BF%A1%E9%98%9F%E5%88%97.png)

1. 死信交换机和队列 和 普通交换机和队列没有区别
2. 当消息成为死信后，如果该正常队列绑定了死信交换机，则消息会被路由到死信队列中
3. 消息成为死信的三种情况
  + 队列长度到达限制
  + 消费者拒收消息，并且不重回队列
  + 消息过期

### 延迟队列
![延迟队列](https://xujianxing.oss-cn-beijing.aliyuncs.com/2020-11-29/%E5%BB%B6%E8%BF%9F%E9%98%9F%E5%88%97.png)

采用 TTL 队列过期时间 + 死信队列完成延迟队列



### 日志与监控

### 消息可靠性分析与追踪

打开 

### 管理

---

## RabbitMq 应用问题

### 消息可靠性保障

### 消息幂等性处理（重复消费）

---

## RabbitMq 集群搭建

### 高可用集群搭建
