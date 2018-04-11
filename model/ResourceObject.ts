import { DataStream } from "../dataStream/DataStream";


export class ResourceObject {
   /** 类型名称 */
   public typeName: string;
   /** 版本 */
   public version: number;

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      this.typeName = stream.readString();
      this.version = stream.readInt32();
   }

   /**
    * 序列化模型
    */
   public serialize(stream: DataStream) {
      stream.writeString(this.typeName);
      stream.writeInt32(this.version);
   }
}
