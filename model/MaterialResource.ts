import { ResourceComponent } from "./ResourceComponent";
import { Color4 } from "./Color4";
import { DataViewer } from "../dataStream/DataViewer";
import { DataStream } from "../dataStream/DataStream";

export class MaterialResource extends ResourceComponent {
   /** 效果名称 */
   public effectCode: string;           //效果名称
   public ambientColor: Color4;         //环境光
   public diffuseColor: Color4;         //漫反射
   public specularColor: Color4;        //高光反射
   public emissiveColor: Color4;        //自发光
   public shininess: number;            //发光强度
   public transparencyFactor: number;   //透明强度
   public reflectionFactor: number;     //反射强度

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.effectCode = "效果";
      this.ambientColor = new Color4();
      this.diffuseColor = new Color4();
      this.specularColor = new Color4();
      this.emissiveColor = new Color4();
      this.shininess = 0;
      this.transparencyFactor = 0;
      this.reflectionFactor = 0;
   }

   /** 
    * 从数据流中反序列化数据。
    *
    * @param stream 数据流
    */
   public unserialize(stream: DataStream) {
      super.unserialize(stream);
      // 读取顶点属性
      this.effectCode = stream.readString();
      this.ambientColor.unserialize(stream);
      this.diffuseColor.unserialize(stream);
      this.specularColor.unserialize(stream);
      this.emissiveColor.unserialize(stream);
      this.shininess = stream.readFloat();
      this.transparencyFactor = stream.readFloat();
      this.reflectionFactor = stream.readFloat();
   }

   /** 
 * 从数据流中反序列化数据。
 *
 * @param stream 数据流
 */
   public serialize(stream: DataStream) {
      super.serialize(stream);
      // 读取顶点属性
      stream.writeString(this.effectCode);
      this.ambientColor.serialize(stream);
      this.diffuseColor.serialize(stream);
      this.specularColor.serialize(stream);
      this.emissiveColor.serialize(stream);
      stream.writeFloat(this.shininess);
      stream.writeFloat(this.transparencyFactor);
      stream.writeFloat(this.reflectionFactor);
   }
}

/**
 * 材质资源集合。
 */
export type MaterialResourceMap = {
   [key: string]: MaterialResource
}

