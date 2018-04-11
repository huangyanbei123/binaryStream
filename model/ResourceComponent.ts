import { ResourceObject } from './ResourceObject';
import { DataStream } from '../dataStream/DataStream';

export class ResourceComponent extends ResourceObject {
   /** 唯一编号 */
   public guid: string;
   /** 名称 */
   public name: string;
   /** 标签 */
   public label: string;

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      super.unserialize(stream);
      // 设置属性
      this.guid = stream.readString();
      this.name = stream.readString();
      this.label = stream.readString();
   }

   public serialize(stream: DataStream) {
      super.serialize(stream);
      stream.writeString(this.guid);
      stream.writeString(this.name);
      stream.writeString(this.label);

   }
}
