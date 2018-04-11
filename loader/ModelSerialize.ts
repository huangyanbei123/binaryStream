import { DataViewer } from './../dataStream/DataViewer';
import { ModelResource } from './../model/ModelResource';
import { DataStream } from "../dataStream/DataStream";

export class ModelSerialize {
   /**
    * 模型内存数据
    */
   public model: ModelResource;
   /**
    * 模型数据流
    */
   public stream: DataViewer;
   /**
    * 二进制流数据
    */
   public data: ArrayBuffer;
   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性

   }
   /**
    * 加载数据处理。
    *
    * @param stream 输入数据流
    */
   public unserialize() {
      var data = this.data;
      var stream = this.stream = new DataStream(data, null, null, true);
      var model = this.model = new ModelResource();
      model.unserialize(stream);
   }

   /**
    *  反序列化数据流
    */
   public serialize() {
      if (this.model) {
         var stream = this.stream = new DataStream();
         this.model.serialize(stream);
      }
   }
}
