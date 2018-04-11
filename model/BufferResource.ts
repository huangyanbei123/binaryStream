import { ResourceObject } from './ResourceObject';
import { DataStream } from '../dataStream/DataStream';
import { TypeArrayUtil } from './TypeArrayUtil';

export class BufferResource extends ResourceObject {
   /** 名称 */
   public name: string;
   /** 元素数据类型 */
   public elementDataCd: number;
   /** 元素总数 */
   public elementCount: number;
   /** 单位化 */
   public normalize: boolean;
   /** 数据宽度 */
   public dataStride: number;
   /** 数据个数 */
   public dataCount: number;
   /** 数据长度 */
   public length: number;
   /** 字节长度 */
   public byteLength: number;
   /** 数据 */
   public data: any;

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      super.unserialize(stream);
      // 读取属性
      this.name = stream.readString();
      var elementDataCd = this.elementDataCd = stream.readInt8();   //一个数包含几个字节
      var elementCount = this.elementCount = stream.readInt8();  // 一个元素的包含几个数
      this.normalize = stream.readBoolean();
      var dataStride = this.dataStride = stream.readInt8();
      var dataCount = this.dataCount = stream.readInt32();
      // 读取数据
      var length = this.length = elementCount * dataCount;
      var byteLength = this.byteLength = dataStride * dataCount;
      var data = this.data = TypeArrayUtil.createArray(elementDataCd, length);
      stream.readBytes(data.buffer, byteLength);
   }

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public serialize(stream: DataStream) {
      super.serialize(stream);
      // 读取属性
      stream.writeString(this.name);
      var elementDataCd = this.elementDataCd;
      stream.writeInt8(elementDataCd); // 一个数的类型
      var elementCount = this.elementCount; // 一个元素的包含几个数
      stream.writeInt8(elementCount);
      stream.writeBoolean(this.normalize); // 是否归一化
      var dataStride = this.dataStride; // 数据的偏移，一般是无偏移的，一个buffer只存储一种类型的数据
      stream.writeInt8(dataStride);
      //数据的总个数
      var dataCount = this.dataCount;
      stream.writeInt32(dataCount);
      var byteLength = this.byteLength;
      var data = this.data;
      stream.writeBytes(data.buffer, byteLength);
   }
}

/**
 * 缓冲资源集合。
 */
export type BufferResourceMap = {
   [key: string]: BufferResource
}
