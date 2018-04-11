import { DataTypeEnum } from './DataTypeEnum';
import { ResourceComponent } from './ResourceComponent';
import { GeometryResource } from './GeometryResource';
import { MaterialResource } from './MaterialResource';
import { DataViewer } from '../dataStream/DataViewer';
import { Vector3 } from './Vector3';
import { DataStream } from '../dataStream/DataStream';

export class MeshResource extends ResourceComponent {
   /** 位置 */
   public position: Vector3;
   /** 四元数 */
   public rotation: Vector3;
   /** 缩放 */
   public scale: Vector3;
   /** 几何数据 */
   public geometry: GeometryResource;
   /** 材质数据 */
   public material: MaterialResource;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.position = new Vector3();
      this.rotation = new Vector3();
      this.scale = new Vector3();
      this.geometry = new GeometryResource();
      this.material = new MaterialResource();
   }

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      super.unserialize(stream);
      // 读取属性
      this.position.unserialize(stream, DataTypeEnum.Float32);
      this.rotation.unserialize(stream, DataTypeEnum.Float32);
      this.scale.unserialize(stream, DataTypeEnum.Float32);
      // 读取数据
      this.geometry.unserialize(stream);
      this.material.unserialize(stream);
   }

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public serialize(stream: DataStream) {
      super.serialize(stream);
      // 读取属性
      this.position.serialize(stream, DataTypeEnum.Float32);
      this.rotation.serialize(stream, DataTypeEnum.Float32);
      this.scale.serialize(stream, DataTypeEnum.Float32);
      // 读取数据
      this.geometry.serialize(stream);
      this.material.serialize(stream);
   }
}

/**
 * 网格资源集合。
 */
export type MeshResourceMap = {
   [key: string]: MeshResource
}
