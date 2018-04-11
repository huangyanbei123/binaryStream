import { MeshResource } from './MeshResource';
import { ResourceComponent } from './ResourceComponent';
import { DataStream } from '../dataStream/DataStream';

export class ModelResource extends ResourceComponent {
   /** 网格数据 */
   public meshs: Array<MeshResource>;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.meshs = new Array<MeshResource>();
   }

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      super.unserialize(stream);
      // 读取顶点属性
      var count = stream.readInt32();
      if (count) {
         for (var i = 0; i < count; i++) {
            var mesh = new MeshResource();
            mesh.unserialize(stream);
            this.meshs.push(mesh);
         }
      }
   }

   /**
    * 序列化
    * @param stream 
    */
   public serialize(stream: DataStream) {
      super.serialize(stream);
      stream.writeInt32(this.meshs.length);
      var length = this.meshs.length;
      if (length) {
         for (var i = 0; i < length; i++) {
            this.meshs[i].serialize(stream);
         }
      }
   }
}
