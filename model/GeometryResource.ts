import { ResourceComponent } from './ResourceComponent';
import { BufferResource, BufferResourceMap } from './BufferResource';
import { DataStream } from '../dataStream/DataStream';

export class GeometryResource extends ResourceComponent {
   /** 顶点个数 */
   public vertexCount: number;
   /** 顶点集合 */
   public vertexes: BufferResourceMap;
   /** 索引个数 */
   public indexCount: number;
   /** 索引缓冲 */
   public indexes: Array<BufferResource>;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.vertexes = new Object() as BufferResourceMap;
      this.indexes = new Array<BufferResource>();

   }

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      super.unserialize(stream);
      // 读取顶点属性
      var count = this.vertexCount = stream.readInt32();
      if (count) {
         for (var i = 0; i < count; i++) {
            var buffer = new BufferResource();
            buffer.unserialize(stream);
            this.vertexes[buffer.name] = buffer;
         }
      }
      // 读取索引属性
      var count = this.indexCount = stream.readInt32();
      if (count) {
         for (var i = 0; i < count; i++) {
            var buffer = new BufferResource();
            buffer.unserialize(stream);
            this.indexes.push(buffer);
         }
      }
   }

   /** 
    * 从数据流中序列化数据。
    *
    * @param stream 数据流
    */
   public serialize(stream: DataStream) {
      super.serialize(stream);
      // 读取顶点属性
      var count = this.vertexCount;

      stream.writeInt32(this.vertexCount);
      for (var name in this.vertexes) {
         this.vertexes[name].serialize(stream);
      }
      // 读取索引属性
      count = this.indexCount;
      stream.writeInt32(count);
      if (count) {
         for (var i = 0; i < count; i++) {
            var buffer = this.indexes[i];
            buffer.serialize(stream);
         }
      }
   }
}
