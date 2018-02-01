package org.streampipes.pe.mixed.flink.samples.filter.numericallist;

import org.apache.flink.streaming.api.datastream.DataStream;
import org.streampipes.wrapper.flink.FlinkDeploymentConfig;
import org.streampipes.wrapper.flink.FlinkDataProcessorRuntime;

import java.io.Serializable;
import java.util.Map;

public class ListFilterProgram extends FlinkDataProcessorRuntime<ListFilterParameters>
        implements Serializable {

  public ListFilterProgram(ListFilterParameters params,
                            FlinkDeploymentConfig config) {
    super(params, config);
  }

  public ListFilterProgram(ListFilterParameters params) {
    super(params);
  }


  @Override
  protected DataStream<Map<String, Object>> getApplicationLogic(DataStream<Map<String, Object>>... messageStream) {
    return messageStream[0].flatMap(new ListFilter(bindingParams.getPropertyName(),
            bindingParams.getFilterKeywords(), bindingParams.getFilterOperation(), bindingParams.getFilterSettings()));
  }
}
